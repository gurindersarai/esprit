import { Link, usePage } from '@inertiajs/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function UserProfileCard({value}) {
  // console.log(value);
  const props = usePage().props;
  const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,right:0}}
        onClick={onClick}
      />
    );
  }
  
  const SlickPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,left:0,zIndex:70 }}
        onClick={onClick}
      />
    );
  }
    var sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />
      };
    return (
        <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Slider {...sliderSettings}>
       {value.user.images.map(function(imv, imi){
            return(<div key={imi}> <img  className="w-full h-80 object-cover	 mb-3 rounded shadow-lg" src={props.ziggy.url+'/storage/'+imv.image} alt="Bonnie image"/>  </div>);
        })}

    </Slider>
    <div className="flex flex-col items-center pb-10">

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{value.user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
        {value.interests.map(function(iv, ii){
            return( <span key={ii} className='mx-1 border-b-2 border-indigo-500 text-black dark:text-white italic text-sm'>{iv.interest.name}</span> );
        })}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-red-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="white" viewBox="0 96 960 960" width="20"><path d="m480 936-58-52q-101-91-167-157T150 608.5Q111 556 95.5 512T80 422q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810 608.5Q771 661 705 727T538 884l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518 376h-76q-15-41-55-67.5T300 282q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480 828Zm0-273Z"/></svg>
            </a>
            <Link className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-indigo-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" href={route('messages')+'/'+value.user.id}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20"  fill="white" viewBox="0 96 960 960" width="20"><path d="M80 976V256q0-33 23.5-56.5T160 176h640q33 0 56.5 23.5T880 256v480q0 33-23.5 56.5T800 816H240L80 976Zm80-193 47-47h593V256H160v527Zm0-527v527-527Z"/></svg>
            </Link>
        </div>
    </div>
</div>
    );
}
