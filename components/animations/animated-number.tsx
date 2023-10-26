import { Box, Flex } from '@radix-ui/themes';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function Counter({ value }: { value: number }) {
  return (
    <Flex style={{ fontSize }} gap='1' className='overflow-hidden leading-none'>
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </Flex>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <Box style={{ height }} className='relative w-[1ch] tabular-nums'>
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </Box>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className='absolute inset-0 flex items-center justify-center'
    >
      {number}
    </motion.span>
  );
}
