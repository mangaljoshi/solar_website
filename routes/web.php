<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\Lpv88Controller;
use App\Http\Controllers\SolarCaliforniaController;

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


// Route::get('/', [BaseController::class, 'home'])->name('home');
// Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
// Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
// Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
// Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
// Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
// Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
// Route::get('/quote-report', [BaseController::class, 'thankyou'])->name('thankyou');
// Route::post('/update-data/{step}', [BaseController::class, 'updateData'])->name('update.data');


// Route::group(['prefix'=>'lpv88','as'=>'energy.'], function(){
//     Route::get('/', [Lpv88Controller::class, 'home'])->name('home');
//     Route::post('/zip-data', [Lpv88Controller::class, 'zipForm'])->name('zip.post');
//     Route::get('/solar-wizard', [Lpv88Controller::class, 'solarWizard'])->name('solar.wizard');
//     Route::get('/marketing-partners', [Lpv88Controller::class, 'marketingPartners'])->name('marketing');
//     Route::get('/terms', [Lpv88Controller::class, 'terms'])->name('terms');
//     Route::get('/contact', [Lpv88Controller::class, 'contact'])->name('contact');
//     Route::get('/privacy', [Lpv88Controller::class, 'privacy'])->name('privacy');
//     Route::get('/quote-report', [Lpv88Controller::class, 'thankyou'])->name('thankyou');
//     Route::post('/update-data/{step}', [Lpv88Controller::class, 'updateData'])->name('update.data');
// });

// Route::group(['prefix'=>'solar-energy-resolution-california','as'=>'solar.california.'], function(){
//     Route::get('/', [SolarCaliforniaController::class, 'home'])->name('home');
//     Route::post('/zip-data', [SolarCaliforniaController::class, 'zipForm'])->name('zip.post');
//     Route::get('/solar-wizard', [SolarCaliforniaController::class, 'solarWizard'])->name('solar.wizard');
//     Route::get('/marketing-partners', [SolarCaliforniaController::class, 'marketingPartners'])->name('marketing');
//     Route::get('/terms', [SolarCaliforniaController::class, 'terms'])->name('terms');
//     Route::get('/contact', [SolarCaliforniaController::class, 'contact'])->name('contact');
//     Route::get('/privacy', [SolarCaliforniaController::class, 'privacy'])->name('privacy');
//     Route::get('/quote-report', [SolarCaliforniaController::class, 'thankyou'])->name('thankyou');
//     Route::post('/update-data/{step}', [SolarCaliforniaController::class, 'updateData'])->name('update.data');
// });


Route::get('/', [BaseController::class, 'home'])->name('home');
Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
Route::get('/quote-report', [BaseController::class, 'quotereport'])->name('quotereport');
Route::post('/update-data/{step}', [BaseController::class, 'updateData'])->name('update.data');
Route::post('/second-service', [BaseController::class, 'secondService'])->name('second.service');
Route::get('/thank-you', [BaseController::class, 'thankYou'])->name('thank.you');
Route::get('/verify-phone/{number}', [BaseController::class, 'verifyPhone'])->name('verify.phone');

Route::group(['prefix'=>'{route_name}','as'=>'energybill.'], function(){
    Route::get('/', [BaseController::class, 'home'])->name('home');
    Route::post('/zip-data', [BaseController::class, 'zipForm'])->name('zip.post');
    Route::get('/solar-wizard', [BaseController::class, 'solarWizard'])->name('solar.wizard');
    Route::get('/marketing-partners', [BaseController::class, 'marketingPartners'])->name('marketing');
    Route::get('/terms', [BaseController::class, 'terms'])->name('terms');
    Route::get('/contact', [BaseController::class, 'contact'])->name('contact');
    Route::get('/privacy', [BaseController::class, 'privacy'])->name('privacy');
    Route::get('/quote-report', [BaseController::class, 'quotereport'])->name('quotereport');
    Route::post('/second-service', [BaseController::class, 'secondService'])->name('second.service');
    Route::get('/thank-you', [BaseController::class, 'thankyou'])->name('thank.you');
});
