#include <stdio.h>
#include <string.h>

#define MAX 25

// Structure for student data
struct Student {
    int roll;
    char name[50];
    float marks;
};

// Function declarations
void addStudent(struct Student s[], int *n);
void showStudents(struct Student s[], int n);
void showTopper(struct Student s[], int n);
void showAverage(struct Student s[], int n);
void searchStudent(struct Student s[], int n);

int main() {
    struct Student s[MAX];
    int n = 0, choice;

    // Pre-added sample students
    s[n++] = (struct Student){101, "Abhu", 88.5};
    s[n++] = (struct Student){102, "Bobby", 92.0};
    s[n++] = (struct Student){103, "Vipul", 79.5};
    s[n++] = (struct Student){104, "Sattu", 85.0};
    s[n++] = (struct Student){105, "Avi", 91.2};

    do {
        printf("\n===== STUDENT ANALYZER =====\n");
        printf("1. Add Student\n");
        printf("2. Show All Students\n");
        printf("3. Show Topper\n");
        printf("4. Show Average Marks\n");
        printf("5. Search by Roll No\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar(); // to clear newline

        switch (choice) {
            case 1: addStudent(s, &n); break;
            case 2: showStudents(s, n); break;
            case 3: showTopper(s, n); break;
            case 4: showAverage(s, n); break;
            case 5: searchStudent(s, n); break;
            case 6: printf("Goodbye!\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 6);

    return 0;
}

// ---------------- FUNCTIONS ----------------

void addStudent(struct Student s[], int *n) {
    if (*n >= MAX) {
        printf("Cannot add more students!\n");
        return;
    }

    printf("Enter Roll No: ");
    scanf("%d", &s[*n].roll);
    getchar();
    printf("Enter Name: ");
    fgets(s[*n].name, 50, stdin);
    s[*n].name[strcspn(s[*n].name, "\n")] = '\0'; // remove newline
    printf("Enter Marks: ");
    scanf("%f", &s[*n].marks);

    (*n)++;
    printf("Student Added Successfully!\n");
}

void showStudents(struct Student s[], int n) {
    if (n == 0) {
        printf("No student records!\n");
        return;
    }

    printf("\nRoll No\tName\t\tMarks\n");
    printf("-------------------------------\n");
    for (int i = 0; i < n; i++) {
        printf("%d\t%-15s%.2f\n", s[i].roll, s[i].name, s[i].marks);
    }
}

void showTopper(struct Student s[], int n) {
    if (n == 0) {
        printf("No students available!\n");
        return;
    }

    int top = 0;
    for (int i = 1; i < n; i++) {
        if (s[i].marks > s[top].marks)
            top = i;
    }

    printf("\nTopper: %s (Roll: %d) - %.2f marks\n",
           s[top].name, s[top].roll, s[top].marks);
}

void showAverage(struct Student s[], int n) {
    if (n == 0) {
        printf("No students available!\n");
        return;
    }

    float total = 0;
    for (int i = 0; i < n; i++)
        total += s[i].marks;

    printf("Average Marks: %.2f\n", total / n);
}

void searchStudent(struct Student s[], int n) {
    if (n == 0) {
        printf("No records to search!\n");
        return;
    }

    int roll;
    printf("Enter Roll No to search: ");
    scanf("%d", &roll);

    for (int i = 0; i < n; i++) {
        if (s[i].roll == roll) {
            printf("Found: %s - %.2f marks\n", s[i].name, s[i].marks);
            return;
        }
    }

    printf("Student with Roll No %d not found.\n", roll);
}

