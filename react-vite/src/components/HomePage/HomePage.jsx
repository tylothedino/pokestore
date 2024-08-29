import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './HomepageStyle.css'
import { useState } from "react";


const HomePage = () => {
    const nav = useNavigate();
    const user = useSelector((state) => state.session.user);
    const products = useLoaderData().products.products;

    const orderNumber = Math.ceil(Math.random() * (user?.orders.length)) - 1;
    const productNumber = Math.ceil(Math.random() * user?.orders[orderNumber]?.products.length) - 1;

    const existing_categories = [
        "standard-balls",
        "special-balls",
        "healing",
        "status-cures",
        "revival",
        "pp-recovery",
        "vitamins",
        "stat-boosts",
        "spelunking",
        "flutes",
        "collectibles",
        "evolution",
        "loot",
        "dex-completion",
        "mulch",
        "species-specific",
        "all-mail",
        "medicine",
        "picky-healing",
        "baking-only",
        "effort-drop",
        "type-protection",
        "in-a-pinch",
        "other",
        "held-items",
        "effort-training",
        "choice",
        "type-enhancement",
        "training",
        "scarves",
        "bad-held-items",
        "plates",
        "all-machines",
    ];

    const [buyAgain] = useState(user?.orders[orderNumber]?.products[productNumber].product);


    const [category1] = useState(existing_categories[Math.ceil((Math.random() * existing_categories.length) - 1)])
    const [category2] = useState(existing_categories[Math.ceil((Math.random() * existing_categories.length) - 1)])
    const [category3] = useState(existing_categories[Math.ceil((Math.random() * existing_categories.length) - 1)])

    const sendFeatured = () => {
        const links = ['90', '92', '194', '172']
        return nav(`/product/${links[Math.ceil(Math.random() * (links.length)) - 1]}`);
    }

    return (
        <div className="container">
            <h1>Welcome  to the PokeMart!</h1>
            <img className="featured" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/best-items-to-sell-pokemon-scarlet-violet.jpg" onClick={sendFeatured} />
            <div className="center-containers">

                <div className="image-middle">
                    <div>
                        <h3>RECOMMENDED</h3>
                        <img src="https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/03/pokemon-pokeballs.jpg" className="recommended" onClick={(e) => { e.stopPropagation(); nav('/product/4') }} />
                    </div>
                    <div>
                        <h3>Sponsored By</h3>
                        <img src="https://cf.geekdo-images.com/tNCtl9FASwE1azZQIcVrbw__original/img/CN7VSs_2_Hi_Pb6eSu1bcQxE2RU=/0x0/filters:format(jpeg)/pic6488722.jpg" className="sponsored-by" />
                    </div>

                    {
                        user && user.orders.length > 0 ?
                            <div>
                                <h3>Buy Again</h3>
                                <div>
                                    <img src={buyAgain?.image} className="buy-again" onClick={(e) => { e.stopPropagation(); nav(`/product/${buyAgain.id}`) }} />

                                </div>

                            </div>
                            : ""
                    }

                </div>

                <div className="bottom">
                    <div className="category-container">
                        <img className="category-icon" src={products.filter((product) => product.category === category1)[0].image} onClick={(e) => { e.stopPropagation(); nav(`/product/category/${category1}`) }} />
                        <p className="category-title">{category1.toUpperCase().split('-').join(" ")}</p>

                    </div>
                    <div className="category-container">
                        <img className="category-icon" src={products.filter((product) => product.category === category2)[0].image} onClick={(e) => { e.stopPropagation(); nav(`/product/category/${category2}`) }} />
                        <p className="category-title">{category2.toUpperCase().split('-').join(" ")}</p>

                    </div>
                    <div className="category-container">
                        <img className="category-icon" src={products.filter((product) => product.category === category3)[0].image} onClick={(e) => { e.stopPropagation(); nav(`/product/category/${category3}`) }} />
                        <p className="category-title">{category3.toUpperCase().split('-').join(" ")}</p>

                    </div>

                </div>


            </div>
        </div>
    )

}


export default HomePage
