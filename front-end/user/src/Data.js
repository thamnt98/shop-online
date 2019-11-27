// Our product database.
const sampleProducts = [
  {
    id: 1,
    name: "LC4016 CHÂN VÁY BÚT CHÌ DÁNG DÀI (ĐEN)",
    category: "Thời trang công sở",
    price: 55,
    description:
      "The Nike Air Presto Women's Shoe delivers the same unrivaled fit and comfort that marked the 2000 debut of the original.",
    popular: true,
    imageUrls: [
      "https://loza.vn/media/catalog/product/cache/image/LS1250VA-4.jpg",
    ]
  },
  {
    id: 2,
    name: "LV5006 Áo vest tay phối kẻ (Đỏ)",
    category: "Thời trang công sở",
    price: 101,
    description:
      "Shaped in an iconic casio design, this watch features a digital display, stopwatch and an LED backlight. The watch is housed in a durable resin case. Suitable for everyday styling.",

    popular: false,
    imageUrls: [
      "https://loza.vn/media/catalog/product/cache/image/LV5006DO-0_2_1.jpg",
    ]
  },
  {
    id: 3,
    name: "LK6007 Áo khoác phong cách Hàn Quốc",
    category: "Thời trang công sở",
    price: 200,

    popular: false,
    imageUrls: [
      "https://loza.vn/media/catalog/product/cache/image/LK6007-2.jpg",
    ]
  },
  {
    id: 4,
    name: "ÁO SƠ SINH CÀI CHÉO TAY NGẮN",
    category: "Thời trang mẹ và bé",
    price: 102,
    description:
      "Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia" +
      "and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in" +
      "a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life" +
      "with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is" +
      "until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?",

    popular: true,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/23/1/jpg/ao-so-sinh-cai-cheo-tay-ngan.jpg"
    ]
  },
  {
    id: 5,
    name: "ÁO SƠ MI NAM TAY DÀI",
    category: "Thời trang nam",
    price: 102,
    description:
      "Amazing angles: Share consistent high-color fidelity with In-Plane Switching (IPS) technology across a 27-inch diagonal screen. A stunning vantage point for everyone, from almost anywhere" +
      "Distinctively modern and accessible: The contemporary thin profile is enhanced by the modern white and silver colors.The open wedge stand design provides convenient access to VGA and dual HDMI ports",

    popular: true,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/17/1/jpg/ao-so-mi-nam-tay-dai.jpg",
    ]
  },

  {
    id: 7,
    name: "ÁO THUN NAM HỌA TIẾT HOA LÁ",
    category: "Thời trang nam",
    price: 200,
    description: "",
    popular: false,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/20/1/jpg/ao-thun-nam-hoa-tiet-hoa-la.jpg"
    ]
  },
  {
    id: 8,
    name: "ÁO REN TRẮNG TAY NGẮN LOVADOVA",
    category: "Thời trang nữ",
    price: 55,  
    description: "",
    popular: false,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/8/1/jpg/ao-ren-trang-tay-ngan-lovadova.jpg",
    ]
  },
  {
    id: 9,
    name: "ÁO SƠ MI NAM NEW LOOK TAY DÀI MÀU XÁM ĐẬM",
    category: "Thời trang nam",
    price: 55,
    description: "",
    popular: false,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/16/1/jpg/ao-so-mi-nam-new-look-tay-dai-mau-xam-dam.jpg"
    ]
  },
  {
    id: 10,
    name: "BỘ TAY DÀI QUẦN DÀI CARROT",
    category: "Thời trang mẹ và bé",
    price: 120,
    description: "",

    popular: false,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/28/1/jpg/bo-tay-dai-quan-dai-carrot.jpg"
    ]
  },
  {
    id: 11,
    name: "LD2040 Đầm len dệt kim (Đỏ)",
    category: "Thời trang công sở",
    price: 220,
    description:
      "This Certified Refurbished product is tested and certified to look and work like new. The refurbishing process includes functionality testing, basic cleaning, inspection, and repackaging. The product ships with all relevant accessories, a minimum 90-day warranty, and may arrive in a generic box. Only select sellers who maintain a high performance bar may offer Certified Refurbished products on Amazon.com",
    popular: false,
    imageUrls: [
      "https://thoitrangeva.vn/wp-content/uploads/2019/01/LD2040DO-1.jpg"
    ]
  },
  {
    id: 12,
    name: "ÁO KIỂU NỮ ORGAMIE S10 MÀU XANH COBAN",
    category: "Thời trang nữ",
    price: 130,
    description:
      "Water resistant to 200 m (660 ft): In general, suitable for professional marine activity and serious surface water sports, but not scuba diving",

    popular: false,
    imageUrls: [
      "http://net-121pm.web7b.com/files/sanpham/4/1/jpg/ao-kieu-nu-orgamie-s10-mau-xanh-coban.jpg",
    ]
  }
];

// List of item categories.
const categories = [
  {
    name: "All categories",
    icon: "list"
  },
  {
    name: "Thời trang nữ",
    icon: "group"
  },
  {
    name: "Thời trang nam",
    icon: "watch"
  },
  {
    name: "Thời trang mẹ và bé",
    icon: "menu_book"
  },
  {
    name: "Thời trang công sở",
    icon: "computer"
  }
];

// Data for rendering menu.
const dataForTheMenu = [
    { name: "Home page", url: "/", icon: "home", id: 0 },
    {
      name: "Product categories",
      id: 1,
      children: categories.map((x, i) => {
        return {
          name: x.name,
          id: 2 + i,
          url: "/?category=" + x.name + "&directClick=true",
          icon: x.icon
        };
      })
    },

  ];


export { sampleProducts, categories, dataForTheMenu };
