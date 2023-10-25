import {Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

function Slideshow(props) => {
  const vecStyles = {
    height: "80%",
    width: "80%",
  }
  const slides = props.imgs.map((img,index) => {
    return (
    <SwiperSlide key={index}>
      <div className='login-slide'>
        <img src={`/Vectors/${img}`} alt="" style={vecStyles}/>
        <h3>Start your day with our productivity todolists!!!</h3>
      </div>
    </SwiperSlide>
    )
  })
  return (
    <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    autoplay={{delay: 2000}}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
      {slides}
    </Swiper>
  );
};

export default Slideshow;
