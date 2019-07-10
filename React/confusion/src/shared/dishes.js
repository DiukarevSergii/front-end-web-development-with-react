import faker from 'faker';
import { clone } from 'lodash';

function createFakeComments() {
  const comments = [];

  for (let i = 0; i < 4; i += 1) {
    const comment = {};
    comment.author = faker.name.findName();
    comment.data = faker.date.past();
    comment.sentence = faker.lorem.sentence();
    comments.push(comment);
  }

  return comments;
}

async function createDishes() {
  console.log('create dishes');
  const dishes = [
    {
      id: 0,
      name: 'Uthappizza',
      image: 'assets/images/uthappizza.png',
      category: 'mains',
      label: 'Hot',
      price: '4.99',
      description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies.',
    },
    {
      id: 1,
      name: 'Zucchipakoda',
      image: 'assets/images/zucchipakoda.png',
      category: 'appetizer',
      label: '',
      price: '1.99',
      description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
    },
    {
      id: 2,
      name: 'Vadonut',
      image: 'assets/images/vadonut.png',
      category: 'appetizer',
      label: 'New',
      price: '1.99',
      description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
    },
    {
      id: 3,
      name: 'ElaiCheese Cake',
      image: 'assets/images/elaicheesecake.png',
      category: 'dessert',
      label: '',
      price: '2.99',
      description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    },
  ];

  const promises = await dishes.map(async (dish) => {
    const newDish = clone(dish);
    newDish.comments = await createFakeComments();
    return newDish;
  });

  return Promise.all(promises);
}

export default createDishes();
