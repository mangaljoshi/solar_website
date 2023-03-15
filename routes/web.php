<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\LPV88Controller;

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


Route::group(['prefix'=>'lpv88','as'=>'energy.'], function(){
    Route::get('/', [LPV88Controller::class, 'home'])->name('home');
    Route::post('/zip-data', [LPV88Controller::class, 'zipForm'])->name('zip.post');
    Route::get('/solar-wizard', [LPV88Controller::class, 'solarWizard'])->name('solar.wizard');
    Route::get('/marketing-partners', [LPV88Controller::class, 'marketingPartners'])->name('marketing');
    Route::get('/terms', [LPV88Controller::class, 'terms'])->name('terms');
    Route::get('/contact', [LPV88Controller::class, 'contact'])->name('contact');
    Route::get('/privacy', [LPV88Controller::class, 'privacy'])->name('privacy');
    Route::get('/quote-report', [LPV88Controller::class, 'thankyou'])->name('thankyou');
    Route::post('/update-data/{step}', [LPV88Controller::class, 'updateData'])->name('update.data');
});

