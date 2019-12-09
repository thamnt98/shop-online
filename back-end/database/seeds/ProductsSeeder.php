<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        DB::table('products')->insert([
            'name' => 'LC4016 CHÂN VÁY BÚT CHÌ DÁNG DÀI (ĐEN)',
            'category'=>'Thời trang nữ',
            'price'=> '55',
      'description'=> "The Nike Air Presto Women's Shoe delivers the same unrivaled fit and comfort that marked the 2000 debut of the original.",
'popular'=> true,
'imageUrls'=>"https://loza.vn/media/catalog/product/cache/image/LS1250VA-4.jpg"
        ]);
    }
}
