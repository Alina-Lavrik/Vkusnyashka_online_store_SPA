import top from "../images/top_cont.png"
import fire from "../images/fire.png"

const Content = () => {
    return (
        <div>
            <div className="top_contant">
                <div className="top_info">
                <h1 className="top_header white">Широкий ассортимент мороженного</h1>
                    <p className="top_text white">Вкусняшка - это место, где вы найдете мороженое на любой вкус! У нас огромный выбор сортов,
                    от клсччичесих до самых экзотических. Мы постоянно обновляем наше меню, предлагая новые и
                    интересные вкусы.
                    </p>
                    <div className="top_buttons">
                        <button className="top_btn_first">Перейти</button>
                        <button className="top_btn_second">Подробнее</button>
                    </div>
                </div>
                <div className="top_cont_img_box">
                    <img className="top_cont_img" src={top} alt="top_ice_cream"/>
                </div>
            </div>
            <div className="comment_box"><h3 className="comment_text">Ассортимент
            </h3><img className="img-fire" src={fire} alt="fire_image"/> </div>
        </div>
    ) 
};

export default Content;