const { Carousel: CarouselModel } = require('./model');

class Carousel {
  constructor(id, carousel) {
    this.id = id;
    this.carousel = carousel;
  }

  static retrieveCarouselSequence() {
    return new Promise((resolve, reject) => CarouselModel.find((error, carousel) => {
      if (error) {
        return reject(error);
      }
      return resolve(carousel);
    }));
  }

  updateCarouselSequenceById() {
    return new Promise((resolve, reject) => {
      Carousel.findByIdAndUpdate({ _id: this.id }, { sequence: this.carousel.sequence }, { new: true }, (error, _sequence) => {
        if (error) { return reject(error); }
        return resolve(_sequence);
      });
    });
  }
}

module.exports = Carousel;
