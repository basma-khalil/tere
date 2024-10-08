import '../assets/styles/style.scss';
import { Popover, Carousel } from 'bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
  new Popover(popover);
});

AOS.init();

const appCarousel = document.querySelector('#carousel') as Element;
// @ts-ignore:next-line
const carousel = new Carousel(appCarousel);
