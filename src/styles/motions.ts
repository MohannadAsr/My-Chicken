export const MotionToTop = {
  initial: { opacity: 0, top: 20 },
  whileInView: { opacity: 1, top: 0 },
};

export const MotionRotate = {
  initial: { opacity: 0, rotate: 20 },
  whileInView: { opacity: 1, rotate: 0 },
};

export const MotionLeft = {
  initial: { opacity: 0, left: -20 },
  whileInView: { opacity: 1, left: 0 },
};

export const MotionPopup = {
  initial: { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1 },
};

{
  /*
  variants={MotionLeft}
  initial="initial"
  animate="whileInView"
  viewport = {{once : true}}
  */
}
