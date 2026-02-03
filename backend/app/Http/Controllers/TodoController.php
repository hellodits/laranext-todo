<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * Get all todos for authenticated user.
     */
    public function index()
    {
        $todos = Todo::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'todos' => $todos,
        ], 200);
    }

    /**
     * Create a new todo.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'descriptions' => 'nullable|string',
        ]);

        $todo = Todo::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'descriptions' => $request->descriptions,
            'is_done' => false,
        ]);

        return response()->json([
            'message' => 'Todo created successfully',
            'todo' => $todo,
        ], 201);
    }

    /**
     * Update an existing todo.
     */
    public function update(Request $request, $id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$todo) {
            return response()->json([
                'message' => 'Todo not found or unauthorized',
            ], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'descriptions' => 'nullable|string',
            'is_done' => 'sometimes|boolean',
        ]);

        $todo->update($request->only(['title', 'descriptions', 'is_done']));

        return response()->json([
            'message' => 'Todo updated successfully',
            'todo' => $todo,
        ], 200);
    }

    /**
     * Delete a todo.
     */
    public function destroy($id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$todo) {
            return response()->json([
                'message' => 'Todo not found or unauthorized',
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully',
        ], 200);
    }
}
