<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [BaseController::class, 'home'])->name('home');
Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
Route::get('/quote-report', [BaseController::class, 'thankyou'])->name('thankyou');
Route::post('/update-data/{step}', [BaseController::class, 'updateData'])->name('update.data');
