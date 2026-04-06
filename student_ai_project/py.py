Code 
import customtkinter as ctk
import tkinter as tk
import math
class TreeNode(object):
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
        self.height = 1
class AVLTree(object):
    def __init__(self):
        self.root = None
    def search(self, data):
        return self._search_recursive(self.root, data)
    def _search_recursive(self, root, data):
        if not root:
            return False
        elif root.data == data:
            return True
        elif data < root.data:
            return self._search_recursive(root.left, data)
        else:
            return self._search_recursive(root.right, data)
    def contains(self, data):
        return self.search(data)
    def insert(self, data):
        self.root = self._insert_recursive(self.root, data)
    def _insert_recursive(self, root, data):
        if not root:
            return TreeNode(data)
        elif data < root.data:
            root.left = self._insert_recursive(root.left, data)
        else:
            root.right = self._insert_recursive(root.right, data)
        root.height = 1 + max(self._get_height(root.left), self._get_height(root.right))
        balance_factor = self._get_balance(root)
        if balance_factor > 1 and data < root.left.data:
            return self._right_rotate(root)
        if balance_factor < -1 and data > root.right.data:
            return self._left_rotate(root)
        if balance_factor > 1 and data > root.left.data:
            root.left = self._left_rotate(root.left)
            return self._right_rotate(root)
        if balance_factor < -1 and data < root.right.data:
            root.right = self._right_rotate(root.right)
            return self._left_rotate(root)
        return root
    def delete(self, data):
        self.root = self._delete_recursive(self.root, data)
    def _delete_recursive(self, root, data):
        if not root:
            return root
        elif data < root.data:
            root.left = self._delete_recursive(root.left, data)
        elif data > root.data:
            root.right = self._delete_recursive(root.right, data)
        else:
            if root.left is None:
                temp = root.right
                root = None
                return temp
            elif root.right is None:
                temp = root.left
                root = None
                return temp
            temp = self._get_min_value_node(root.right)
            root.data = temp.data
            root.right = self._delete_recursive(root.right, temp.data)
        if root is None:
            return root
        root.height = 1 + max(self._get_height(root.left), self._get_height(root.right))
        balance_factor = self._get_balance(root)

        if balance_factor > 1 and self._get_balance(root.left) >= 0:
            return self._right_rotate(root)

        if balance_factor > 1 and self._get_balance(root.left) < 0:
            root.left = self._left_rotate(root.left)
            return self._right_rotate(root)

        if balance_factor < -1 and self._get_balance(root.right) <= 0:
            return self._left_rotate(root)

        if balance_factor < -1 and self._get_balance(root.right) > 0:
            root.right = self._right_rotate(root.right)
            return self._left_rotate(root)

        return root

    def _left_rotate(self, z):
        y = z.right
        T2 = y.left

        y.left = z
        z.right = T2

        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

    def _right_rotate(self, z):
        y = z.left
        T3 = y.right

        y.right = z
        z.left = T3

        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))

        return y

    def _get_height(self, root):
        if not root:
            return 0
        return root.height

    def _get_balance(self, root):
        if not root:
            return 0
        return self._get_height(root.left) - self._get_height(root.right)

    def _get_min_value_node(self, root):
        if root is None or root.left is None:
            return root
        return self._get_min_value_node(root.left)

    def get_nodes_by_level(self):
        if not self.root:
            return []

        levels = []
        self._collect_nodes_by_level(self.root, 0, levels)
        return levels

    def _collect_nodes_by_level(self, node, level, levels):
    
    def clear_tree(self):
        self.tree = AVLTree()
        self.redraw_tree()

    def handle_input(self, event=None):
        try:
            value = int(self.entry.get())

            if self.tree.contains(value):
                self.tree.delete(value)
            else:
                self.tree.insert(value)

            self.entry.delete(0, ctk.END)
            self.redraw_tree()
        except:
            pass

    def redraw_tree(self):
        self.canvas.delete("all")

        if not self.tree.root:
            self.canvas.create_text(500, 350, text="Tree is Empty", fill="white", font=("Arial", 20))
            return

        positions = {}
        self._calculate_positions(self.tree.root, 500, 60, 220, positions)

        for node, (x1, y1) in positions.items():
            radius = 20

            if node.left:
                x2, y2 = positions[node.left]
                self.canvas.create_line(x1, y1, x2, y2, fill="#ED6942", width=2)

            if node.right:
                x2, y2 = positions[node.right]
                self.canvas.create_line(x1, y1, x2, y2, fill="#ED6942", width=2)

        for node, (x, y) in positions.items():
            color = "#0a77ca" if node == self.tree.root else "#79baec"

            self.canvas.create_oval(x - 20, y - 20, x + 20, y + 20, fill=color, outline="white")
            self.canvas.create_text(x, y, text=str(node.data), fill="white", font=("Arial", 12, "bold"))

    def _calculate_positions(self, node, x, y, offset, positions):
        if not node:
            return

        positions[node] = (x, y)

        if node.left:
            self._calculate_positions(node.left, x - offset, y + 80, offset * 0.6, positions)

        if node.right:
            self._calculate_positions(node.right, x + offset, y + 80, offset * 0.6, positions)


def main():
    ctk.set_appearance_mode("dark")
    ctk.set_default_color_theme("blue")

    app = TreeVisualizer()
    app.mainloop()


if __name__ == "__main__":
    main()










