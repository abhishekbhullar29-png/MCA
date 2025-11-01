import tkinter as tk
from tkinter import ttk, messagebox

# List to store student records
students = []

# Function to add student data
def add_student():
    name = entry_name.get()
    mst = entry_mst.get()
    worksheet = entry_worksheet.get()
    final_marks = entry_final.get()
    attendance = entry_attendance.get()

    # Validation
    if not name or not mst or not worksheet or not final_marks or not attendance:
        messagebox.showwarning("Input Error", "Please fill all fields!")
        return

    try:
        mst = float(mst)
        worksheet = float(worksheet)
        final_marks = float(final_marks)
        attendance = float(attendance)
    except ValueError:
        messagebox.showerror("Invalid Input", "Marks and attendance must be numbers!")
        return

    if mst > 20 or worksheet > 30 or final_marks > 100:
        messagebox.showerror("Invalid Marks", "Please enter marks within valid limits!")
        return

    # Total marks out of 150
    total = mst + worksheet + final_marks
    # Convert to percentage out of 100
    percentage = (total / 150) * 100

    eligibility = "Eligible ✅" if attendance >= 75 else "Not Eligible ❌"
    status = "Pass ✅" if percentage >= 40 else "Fail ❌"

    students.append({
        "Name": name,
        "MST": mst,
        "Worksheet": worksheet,
        "Final": final_marks,
        "Total": total,
        "Percentage": round(percentage, 2),
        "Attendance": attendance,
        "Eligibility": eligibility,
        "Status": status
    })

    messagebox.showinfo("Success", f"Student '{name}' added successfully!")
    clear_entries()
    show_students()

# Function to clear input fields
def clear_entries():
    entry_name.delete(0, tk.END)
    entry_mst.delete(0, tk.END)
    entry_worksheet.delete(0, tk.END)
    entry_final.delete(0, tk.END)
    entry_attendance.delete(0, tk.END)

# Function to display student records
def show_students():
    for row in tree.get_children():
        tree.delete(row)
    for student in students:
        tree.insert("", tk.END, values=(
            student["Name"],
            student["MST"],
            student["Worksheet"],
            student["Final"],
            f"{round((student['Total'] / 150) * 100, 2)}",  # show total scaled to 100
            f"{student['Attendance']}%",
            f"{student['Percentage']}%",
            student["Eligibility"],
            student["Status"]
        ))

# Function to analyze class data
def analyze_students():
    if not students:
        messagebox.showinfo("No Data", "No students added yet!")
        return

    total_students = len(students)
    eligible = sum(1 for s in students if s["Eligibility"] == "Eligible ✅")
    failed = sum(1 for s in students if s["Status"] == "Fail ❌")
    topper = max(students, key=lambda x: x["Percentage"])

    analysis_text = (
        f"📊 CLASS ANALYSIS 📊\n\n"
        f"Total Students: {total_students}\n"
        f"Eligible Students: {eligible}\n"
        f"Failed Students: {failed}\n\n"
        f"🏆 Topper: {topper['Name']} ({topper['Percentage']}%)"
    )

    messagebox.showinfo("Class Analysis", analysis_text)

# GUI Setup
root = tk.Tk()
root.title("🎓 Student Analyzer")
root.geometry("950x550")
root.configure(bg="#f7f7f7")

# Title
title = tk.Label(root, text="STUDENT ANALYZER SYSTEM", font=("Arial", 20, "bold"),
                 bg="#333", fg="white", pady=10)
title.pack(fill=tk.X)

# Frame for Inputs
frame = tk.Frame(root, bg="#f7f7f7", pady=10)
frame.pack()

tk.Label(frame, text="Student Name:", bg="#f7f7f7").grid(row=0, column=0, padx=10, pady=5, sticky="e")
entry_name = tk.Entry(frame, width=25)
entry_name.grid(row=0, column=1)

tk.Label(frame, text="MST Marks (20):", bg="#f7f7f7").grid(row=1, column=0, padx=10, pady=5, sticky="e")
entry_mst = tk.Entry(frame, width=25)
entry_mst.grid(row=1, column=1)

tk.Label(frame, text="Worksheet Marks (30):", bg="#f7f7f7").grid(row=2, column=0, padx=10, pady=5, sticky="e")
entry_worksheet = tk.Entry(frame, width=25)
entry_worksheet.grid(row=2, column=1)

tk.Label(frame, text="Final Marks (100):", bg="#f7f7f7").grid(row=3, column=0, padx=10, pady=5, sticky="e")
entry_final = tk.Entry(frame, width=25)
entry_final.grid(row=3, column=1)

tk.Label(frame, text="Attendance (%):", bg="#f7f7f7").grid(row=4, column=0, padx=10, pady=5, sticky="e")
entry_attendance = tk.Entry(frame, width=25)
entry_attendance.grid(row=4, column=1)

# Buttons
button_frame = tk.Frame(root, bg="#f7f7f7")
button_frame.pack(pady=10)

tk.Button(button_frame, text="Add Student", bg="#28a745", fg="white",
          command=add_student, width=15).grid(row=0, column=0, padx=10)
tk.Button(button_frame, text="Show Students", bg="#007bff", fg="white",
          command=show_students, width=15).grid(row=0, column=1, padx=10)
tk.Button(button_frame, text="Analyze Class", bg="#ff9800", fg="white",
          command=analyze_students, width=15).grid(row=0, column=2, padx=10)

# Table
columns = ("Name", "MST", "Worksheet", "Final", "Total (100)", "Attendance", "Percentage", "Eligibility", "Status")
tree = ttk.Treeview(root, columns=columns, show="headings", height=10)

for col in columns:
    tree.heading(col, text=col)
    tree.column(col, anchor="center", width=100)

tree.pack(pady=10, fill=tk.X, padx=15)

root.mainloop()
