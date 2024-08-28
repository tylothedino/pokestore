import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProductCategoryDrop() {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const navigate = useNavigate();

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


    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        // console.log("I MADE IT HERE")
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        setShowMenu(false)
    }, [navigate])

    return (
        <div className="category-drop">
            <button onClick={toggleMenu} className="category-button">
                Shop by Category
            </button>

            <div className="curved none">
                <div ref={ulRef} className={"profile-dropdown top center curved container-drop"}>
                    {
                        showMenu && existing_categories.map((category) => (
                            <div key={category} className="max-width margins curved center">
                                <button className="max-width height-category button-style curved" onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); navigate(`/product/category/${category}`) }}>{category}</button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div >
    )


}


export default ProductCategoryDrop
