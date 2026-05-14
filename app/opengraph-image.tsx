import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Raham Butt';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const calSans = await fetch(
    new URL('../public/fonts/CalSans-SemiBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'CalSans',
          fontWeight: 600,
        }}
      >
        Raham Butt
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'CalSans',
          data: calSans,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
