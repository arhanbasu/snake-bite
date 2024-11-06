#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define WIDTH 20
#define HEIGHT 20

typedef struct {
    int x;
    int y;
} Position;

typedef struct {
    Position snake[WIDTH * HEIGHT];
    int snake_length;
    Position food;
    int score;
    int game_over;
} GameState;

// Initialize the game state
void initialize_game(GameState *game) {
    game->snake_length = 1;
    game->snake[0].x = WIDTH / 2;
    game->snake[0].y = HEIGHT / 2;
    game->food.x = rand() % WIDTH;
    game->food.y = rand() % HEIGHT;
    game->score = 0;
    game->game_over = 0;
}

// Print game state in JSON format
void print_game_state(GameState *game) {
    printf("{\"snake\": [");
    for (int i = 0; i < game->snake_length; i++) {
        printf("{\"x\": %d, \"y\": %d}", game->snake[i].x, game->snake[i].y);
        if (i < game->snake_length - 1) printf(", ");
    }
    printf("], \"food\": {\"x\": %d, \"y\": %d}, \"score\": %d, \"game_over\": %d}\n",
           game->food.x, game->food.y, game->score, game->game_over);
}

// Update snake direction based on input
void update_direction(Position *direction, char input) {
    switch (input) {
        case 'W': direction->x = 0; direction->y = -1; break; // Up
        case 'A': direction->x = -1; direction->y = 0; break; // Left
        case 'S': direction->x = 0; direction->y = 1; break; // Down
        case 'D': direction->x = 1; direction->y = 0; break; // Right
    }
}

// Update the game state based on the current direction
void update_game(GameState *game, Position *direction) {
    if (game->game_over) return;

    // Move the snake by adding a new head
    Position new_head = { game->snake[0].x + direction->x, game->snake[0].y + direction->y };

    // Check if snake hit the walls
    if (new_head.x < 0 || new_head.x >= WIDTH || new_head.y < 0 || new_head.y >= HEIGHT) {
        game->game_over = 1;
        return;
    }

    // Check if snake hit itself
    for (int i = 0; i < game->snake_length; i++) {
        if (new_head.x == game->snake[i].x && new_head.y == game->snake[i].y) {
            game->game_over = 1;
            return;
        }
    }

    // Move the snake by shifting each segment
    for (int i = game->snake_length; i > 0; i--) {
        game->snake[i] = game->snake[i - 1];
    }
    game->snake[0] = new_head;

    // Check if snake ate the food
    if (new_head.x == game->food.x && new_head.y == game->food.y) {
        game->score += 10;
        game->snake_length++;
        game->food.x = rand() % WIDTH;
        game->food.y = rand() % HEIGHT;
    }
}

// Main function to run the game loop based on command-line arguments
int main(int argc, char *argv[]) {
    GameState game;
    Position direction = { 1, 0 }; // Initial direction: Right

    // Seed random number generator
    srand(time(0));

    // Initialize the game
    initialize_game(&game);

    // Process input if any
    if (argc > 1) {
        update_direction(&direction, argv[1][0]); // e.g., 'W', 'A', 'S', 'D'
        update_game(&game, &direction);
    }

    // Print the updated game state in JSON format
    print_game_state(&game);

    return 0;
}

