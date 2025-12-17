<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        return Auth::user()
            ->chats()
            ->with('users')
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'users' => 'required|array',
            'users.*' => 'exists:users,id',
        ]);

        $chat = Chat::create([
            'name' => $request->name,
        ]);

        $chat->users()->attach(
            array_unique(array_merge(
                $request->users,
                [Auth::id()]
            ))
        );

        return $chat->load('users');
    }

    public function show(Chat $chat)
    {
        abort_unless(
            $chat->users->contains(Auth::id()),
            403
        );

        return $chat->load(['users', 'messages.sender']);
    }
}
