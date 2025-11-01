#include <stdio.h>
#include <string.h>

#define MAX 100

struct Student {
    int roll_no;
    char name[50];
    float marks;
};

struct Student students[MAX];
int count = 0;

void addStudent() {
    if (count >= MAX) {
        printf("Student limit reached!\n\n");
        return;
    }
    printf("Enter Roll No: ");
    scanf("%d", &students[count].roll_no);
    printf("Enter Name: ");
    scanf(" %[^\n]", students[count].name); 
    printf("Enter Marks: ");
    scanf("%f", &students[count].marks);
    count++;
    printf("Student added successfully!\n\n");
}

void showAllStudents() {
    if (count == 0) {
        printf("No students available.\n\n");
        return;
    }
    printf("\nAll Students:\n");
    for (int i = 0; i < count; i++)
        printf("Roll No: %d, Name: %s, Marks: %.2f\n", students[i].roll_no, students[i].name, students[i].marks);
    printf("\n");
}

void showTopper() {
    if (count == 0) { 
        printf("No students available.\n\n"); 
        return; 
    }
    int topper = 0;
    for (int i = 1; i < count; i++)
        if (students[i].marks > students[topper].marks) topper = i;
    printf("Topper: %s with Marks: %.2f\n\n", students[topper].name, students[topper].marks);
}

void showAverageMarks() {
    if (count == 0) { 
        printf("No students available.\n\n"); 
        return; 
    }
    float total = 0;
    for (int i = 0; i < count; i++) total += students[i].marks;
    printf("Average Marks: %.2f\n\n", total / count);
}

void editStudent() {
    int roll_no;
    printf("Enter Roll No to edit: ");
    scanf("%d", &roll_no);
    for (int i = 0; i < count; i++) {
        if (students[i].roll_no == roll_no) {
            printf("Enter New Name: ");
            scanf(" %[^\n]", students[i].name);
            printf("Enter New Marks: ");
            scanf("%f", &students[i].marks);
            printf("Student updated successfully!\n\n");
            return;
        }
    }
    printf("Student not found.\n\n");
}

void searchByRollNo() {
    int roll_no;
    printf("Enter Roll No to search: ");
    scanf("%d", &roll_no);
    for (int i = 0; i < count; i++) {
        if (students[i].roll_no == roll_no) {
            printf("Found: Roll No: %d, Name: %s, Marks: %.2f\n\n", students[i].roll_no, students[i].name, students[i].marks);
            return;
        }
    }
    printf("Student not found.\n\n");
}

void preloadStudents() {
    struct Student temp[] = {
        {101, "Abhu", 85}, 
        {102, "Vipul", 78}, 
        {103, "Riya", 92},
        {104, "Sahil", 88}, 
        {105, "Neha", 95}, 
        {106, "Karan", 80},
        {107, "Tanya", 90}
    };
    for (int i = 0; i < 7; i++) students[count++] = temp[i];
}

int main() {
    preloadStudents();
    int choice;
    while (1) {
        printf("----- Student Analyzer -----\n");
        printf("1. Add Student\n2. Show All Students\n3. Show Topper\n");
        printf("4. Show Average Marks\n5. Edit Student\n6. Search by Roll No\n7. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        switch(choice) {
            case 1: addStudent(); break;
            case 2: showAllStudents(); break;
            case 3: showTopper(); break;
            case 4: showAverageMarks(); break;
            case 5: editStudent(); break;
            case 6: searchByRollNo(); break;
            case 7: printf("Exiting program.\n"); 
            return 0;
        }
    }
}
