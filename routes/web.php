<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthAdmin\ProfileController as AdminProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');

// Route::get('/', function () {
//     return Inertia::render('Home');
// })->middleware(['auth', 'verified'])->name('home');
Route::get('/admin/dashboard', function () {
    return Inertia::render('AuthAdmin/Dashboard',[
        'totalusers'=> User::count()
    ]);
})->middleware(['auth:admin', 'verified'])->name('admin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/images', [ProfileController::class, 'updateImages'])->name('profile.updateImages');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('/admin/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('/admin/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/authadmin.php';
