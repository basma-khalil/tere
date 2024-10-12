import '../assets/styles/style.scss';
import { Popover, Carousel } from 'bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

/* Initialize Bootstrap Popover */
document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
  new Popover(popover);
});

/* Initialize Animation On Scroll */
AOS.init();

/* Initialize Bootstrap Carousel */
const appCarousel = document.querySelector('#carousel') as Element;
// @ts-ignore:next-line
const carousel = new Carousel(appCarousel);

/* Integrate GraphQL API And Get The Company Data */
const addressElements = document.querySelectorAll(
  '.address'
) as NodeListOf<HTMLParagraphElement>;
const emailElements = document.querySelectorAll(
  '.email'
) as NodeListOf<HTMLParagraphElement>;
const phoneElements = document.querySelectorAll(
  '.phone'
) as NodeListOf<HTMLParagraphElement>;

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});
client
  .query({
    query: gql`
      query {
        user(id: 3) {
          id
          email
          phone
          address {
            city
            street
          }
        }
      }
    `,
  })
  .then((result) => {
    const { id, address, email, phone } = result.data.user as User;

    addressElements.forEach(
      (element) =>
        (element.textContent = address
          ? `${id}, ${address.street}, ${address.city}`
          : 'No address available')
    );
    emailElements.forEach(
      (element) => (element.textContent = email ?? 'No email available')
    );
    phoneElements.forEach(
      (element) => (element.textContent = phone ?? 'No phone available')
    );
  })
  .catch((error) => console.error('Error fetching data:', error));
