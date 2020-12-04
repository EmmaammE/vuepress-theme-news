<template>
  <canvas ref="$canvas" v-bind="chartBound"></canvas>
</template>

<script>
import * as d3 from "d3";

const BATCH_SIZE = 300;

function makeAffineTransformation(a,b,c,d,e,f) {
  // f(x, y) = [a, b; c, d][x, y] + [e, f].
  return function(p) {
    return [a * p[0] + b * p[1] + e, c * p[0] + d * p[1] + f];
  };
};

const transformations = [
  {fn: makeAffineTransformation(0, 0, 0, 0.16, 0, 0), p: 0.01},
  {fn: makeAffineTransformation(0.85, 0.04, -0.04, 0.85, 0, 1.6), p: 0.86},
  {fn: makeAffineTransformation(0.2, -0.26, 0.23, 0.22, 0, 1.6), p: 0.93},
  {fn: makeAffineTransformation(-0.15, 0.28, 0.26, 0.24, 0, 0.44), p: 1.0},
];


function getRandomTransformation() {
  const val = Math.random();
  for (let i = 0; i < transformations.length; ++i) {
    let t = transformations[i];
    if (val <= t.p) {
      return t.fn;
    }
  }
}

function getNextBatch() {
  let curr = [0, 0];

  return Array.from({length: BATCH_SIZE}, (_,i) => {
    const fn = getRandomTransformation();
    curr = fn(curr);
    return curr;
  })
}

export default {
  data() {
    return {
      width: 250,
      height: 450,
      flag: true,
      count: 0,
      pointsNum: 100000
    }
  },

  computed: {
    xScale() {
      return d3.scaleLinear().range([1, this.width-1]).domain([-2.182, 2.6558]);
    },

    yScale() {
      return d3.scaleLinear().range([this.height-1, 1]).domain([0, 9.9983]);
    },

    chartBound() {
      // suppoort high DPI canvas
      const pixel_rartio = window.devicePixelRatio || 1;
      const {width, height} = this;

      // this.$refs.$canvas.getContext('2d').scale(pixel_rartio, pixel_rartio);
      return {
        width: pixel_rartio * width + 'px',
        height: pixel_rartio * height + 'px',
      }
    }
  },
 
  mounted() {
    setTimeout(() => {
      this.draw();
    }, 0);
  },

  beforeDestroy() {
    this.flag = false;
  },

  methods: {
    plotPoints(ps) {
      const {xScale, yScale} = this;
      const ctx = this.$refs.$canvas.getContext('2d');
      ctx.fillStyle = '#cb8e43';
      // ctx.fillStyle = '#f8c9ab'

      ps.forEach((p) => {
        ctx.fillRect(
          xScale(p[0]),
          yScale(p[1]),
          1,
          1
        )
      })
    },

    draw() {
      if( this.flag === false || this.pointsNum <= 1 ) {
        return;
      }

      this.plotPoints(getNextBatch())
      this.pointsNum -= BATCH_SIZE;
      
      requestAnimationFrame(() => {
        this.draw();
      });
    }
  }
}
</script>

<style scoped>
  canvas {
    position: absolute;
    left: 20px;
    opacity: .35;
    bottom: -200px;
    transform: rotate(290deg);
  }
</style>