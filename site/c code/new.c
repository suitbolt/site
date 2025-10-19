
#include <iostream.h>
#include <stdio.h>

// Function declaration
void greetUser(char name[]) {
    printf("Hello, %s! Welcome to Computer Science.\n", name);
}

int main() {
    char userName[30];

    printf("Enter your name: ");
    scanf("%s", userName);   // take input from user

    greetUser(userName);     // call function

    return 0;
}
