import tkinter as tk
from tkinter import ttk, messagebox
import pickle
import csv
import matplotlib.pyplot as plt

# Load model
model = pickle.load(open("model.pkl", "rb"))

students = []

# 🎯 Default Students
default_students = [
    ("101", "Aman", 85, 90),
    ("102", "Riya", 70, 80),
    ("103", "Rahul", 60, 65),
    ("104", "Sneha", 95, 95),
    ("105", "Karan", 50, 55),
    ("106", "Pooja", 78, 85),
    ("107", "Arjun", 40, 50)
]

for roll, name, marks, att in default_students:
    grade = model.predict([[marks, att]])[0]
    students.append((roll, name, marks, att, round(grade, 2)))

# ➕ Add Student
def add_student():
    try:
        roll = roll_entry.get()
        name = name_entry.get()
        marks = float(marks_entry.get())
        att = float(att_entry.get())

        grade = model.predict([[marks, att]])[0]
        student = (roll, name, marks, att, round(grade, 2))

        students.append(student)
        tree.insert("", tk.END, values=student)

        clear_fields()
    except:
        messagebox.showerror("Error", "Invalid Input!")

# 🧹 Clear Fields
def clear_fields():
    roll_entry.delete(0, tk.END)
    name_entry.delete(0, tk.END)
    marks_entry.delete(0, tk.END)
    att_entry.delete(0, tk.END)

# 📊 Load Table
def load_table():
    for row in tree.get_children():
        tree.delete(row)
    for s in students:
        tree.insert("", tk.END, values=s)

# 🔍 Search
def search_student():
    key = search_entry.get().lower()
    for row in tree.get_children():
        tree.delete(row)

    for s in students:
        if key in s[0] or key in s[1].lower():
            tree.insert("", tk.END, values=s)

# 💾 Save CSV
def save_data():
    with open("students.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Roll", "Name", "Marks", "Attendance", "Grade"])
        writer.writerows(students)

    messagebox.showinfo("Saved", "Data saved!")

# 🏆 Topper
def show_topper():
    topper = max(students, key=lambda x: x[4])
    messagebox.showinfo("Topper", f"{topper[1]} ({topper[4]})")

# 📈 Graph
def show_graph():
    names = [s[1] for s in students]
    marks = [s[2] for s in students]
    grades = [s[4] for s in students]

    plt.figure()
    plt.scatter(marks, grades)

    for i, name in enumerate(names):
        plt.text(marks[i], grades[i], name)

    plt.xlabel("Marks")
    plt.ylabel("Grade")
    plt.title("Performance Graph")
    plt.grid()
    plt.show()

# 🖥️ GUI
root = tk.Tk()
root.title("AI Student Analyzer (3 Div Layout)")
root.geometry("950x650")
root.configure(bg="#1e1e2f")

# 🎯 TITLE
tk.Label(root, text="AI Student Analyzer System",
         font=("Arial", 20, "bold"),
         bg="#1e1e2f", fg="#00ffcc").pack(pady=10)

# =========================
# 🔵 DIV 1 → FORM
# =========================
form_frame = tk.Frame(root, bg="#2c2c3c", bd=2, relief="ridge")
form_frame.pack(fill="x", padx=10, pady=5)

tk.Label(form_frame, text="Fill Student Details",
         bg="#2c2c3c", fg="white", font=("Arial", 12, "bold")).pack(pady=5)

form_inner = tk.Frame(form_frame, bg="#2c2c3c")
form_inner.pack(pady=5)

tk.Label(form_inner, text="Roll", bg="#2c2c3c", fg="white").grid(row=0, column=0, padx=5)
roll_entry = tk.Entry(form_inner)
roll_entry.grid(row=0, column=1, padx=5)

tk.Label(form_inner, text="Name", bg="#2c2c3c", fg="white").grid(row=0, column=2, padx=5)
name_entry = tk.Entry(form_inner)
name_entry.grid(row=0, column=3, padx=5)

tk.Label(form_inner, text="Marks", bg="#2c2c3c", fg="white").grid(row=0, column=4, padx=5)
marks_entry = tk.Entry(form_inner)
marks_entry.grid(row=0, column=5, padx=5)

tk.Label(form_inner, text="Attendance", bg="#2c2c3c", fg="white").grid(row=0, column=6, padx=5)
att_entry = tk.Entry(form_inner)
att_entry.grid(row=0, column=7, padx=5)

tk.Button(form_inner, text="Add", bg="#00cc66", fg="white",
          command=add_student).grid(row=0, column=8, padx=10)

# =========================
# 🟢 DIV 2 → SCREEN / TABLE
# =========================
screen_frame = tk.Frame(root, bg="#2c2c3c", bd=2, relief="ridge")
screen_frame.pack(fill="both", expand=True, padx=10, pady=5)

search_frame = tk.Frame(screen_frame, bg="#2c2c3c")
search_frame.pack(pady=5)

tk.Label(search_frame, text="Search", bg="#2c2c3c", fg="white").pack(side=tk.LEFT)
search_entry = tk.Entry(search_frame)
search_entry.pack(side=tk.LEFT, padx=5)

tk.Button(search_frame, text="Search", command=search_student).pack(side=tk.LEFT)
tk.Button(search_frame, text="Show All", command=load_table).pack(side=tk.LEFT, padx=5)

columns = ("Roll", "Name", "Marks", "Attendance", "Grade")
tree = ttk.Treeview(screen_frame, columns=columns, show="headings")

for col in columns:
    tree.heading(col, text=col)
    tree.column(col, width=120)

tree.pack(fill="both", expand=True, pady=10)

# =========================
# 🟣 DIV 3 → BUTTONS
# =========================
btn_frame = tk.Frame(root, bg="#2c2c3c", bd=2, relief="ridge")
btn_frame.pack(fill="x", padx=10, pady=5)

tk.Button(btn_frame, text="Save CSV", bg="#3399ff", fg="white",
          command=save_data).pack(side=tk.LEFT, padx=20, pady=10)

tk.Button(btn_frame, text="Topper", bg="#ff9933", fg="white",
          command=show_topper).pack(side=tk.LEFT, padx=20)

tk.Button(btn_frame, text="Graph", bg="#00ccff", fg="black",
          command=show_graph).pack(side=tk.LEFT, padx=20)

# Load Data
load_table()

root.mainloop()