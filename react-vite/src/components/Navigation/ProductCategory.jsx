import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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



    return (
        <div>
            <button onClick={toggleMenu}>
                Categories
            </button>

            <div ref={ulRef}>
                {
                    showMenu && existing_categories.map((category) => (
                        <div key={category}>
                            <button onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); navigate(`/product/category/${category}`) }}>{category}</button>
                        </div>
                    ))
                }
            </div>

        </div >
    )


}


export default ProductCategoryDrop
