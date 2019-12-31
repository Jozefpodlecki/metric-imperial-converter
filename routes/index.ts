import homeController from './../controllers/home'
import convert from './../controllers/convert'

export default (app: any) => {
  app.get("/api/convert", convert);
  app.get("/", homeController.get);
}