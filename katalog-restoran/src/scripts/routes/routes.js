import Explore from '../views/pages/explore';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': Explore, // default page
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
