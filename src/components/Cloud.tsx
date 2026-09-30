import React, { forwardRef } from 'react';

export interface CloudProps {
  type?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: React.CSSProperties;
}

export const Cloud = forwardRef<HTMLDivElement, CloudProps>(
  ({ type = 1, className = '', style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none select-none will-change-transform ${className}`}
        style={{
          filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))',
          ...style,
        }}
      >
        {type === 1 && (
          // Type 1: Grand Ascending Auspicious Cloud (Top Right)
          <svg
            viewBox="0 0 320 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Main Cloud Body */}
            <path
              d="M290 85C298 94 295 110 276 113C252 116 238 129 216 129C192 129 179 138 155 138C123 138 110 144 86 144C54 144 32 118 32 89C32 60 56 44 80 50C96 34 128 27 155 37C176 29 203 40 219 59C238 59 257 69 270 75C281 80 287 78 290 85Z"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Traditional Spiral Volutes (Xiangyun Ruyi Coils) */}
            <path
              d="M 85,55 A 28 28 0 0 1 113,83 A 20 20 0 0 1 85,103 A 13.5 13.5 0 0 1 71.5,83 A 7.8 7.8 0 0 1 85,75"
              stroke="#C45827"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 155,42 A 26 26 0 0 1 181,68 A 18.7 18.7 0 0 1 155,86.7 A 12.5 12.5 0 0 1 142.5,68 A 7.3 7.3 0 0 1 155,60.7"
              stroke="#C45827"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 218,62 A 22 22 0 0 1 240,84 A 15.8 15.8 0 0 1 218,99.8 A 10.6 10.6 0 0 1 207.4,84 A 6.2 6.2 0 0 1 218,77.8"
              stroke="#C45827"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
          </svg>
        )}

        {type === 2 && (
          // Type 2: Elongated Traditional Cloud Ribbon (Mid Left)
          <svg
            viewBox="0 0 280 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M26 80C17 74 14 62 26 56C43 47 60 34 80 34C100 34 120 43 134 49C148 40 168 34 185 40C205 46 222 61 245 64C262 67 274 73 271 85C268 97 251 97 231 91C208 85 194 88 174 94C151 100 134 94 117 88C97 82 77 88 57 91C37 94 29 85 26 80Z"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Inner spirals */}
            <path
              d="M 82,38 A 24 24 0 0 1 106,62 A 17.3 17.3 0 0 1 82,79.3 A 11.5 11.5 0 0 1 70.5,62 A 6.7 6.7 0 0 1 82,55.3"
              stroke="#C45827"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 160,44 A 20 20 0 0 1 180,64 A 14.4 14.4 0 0 1 160,78.4 A 9.6 9.6 0 0 1 150.4,64 A 5.6 5.6 0 0 1 160,58.4"
              stroke="#C45827"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.35"
            />
          </svg>
        )}

        {type === 3 && (
          // Type 3: Majestic Foreground Pedestal Cloud (Bottom Center)
          <svg
            viewBox="0 0 460 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M24 140C58 158 96 145 125 122C143 104 161 91 182 94C205 76 233 66 264 71C292 53 323 40 359 48C395 56 421 84 418 117C415 143 391 161 352 161C314 161 295 153 264 153C224 153 202 163 171 163C134 163 105 155 72 150C46 145 34 141 24 140Z"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Multi-tier Tang Dynasty coils */}
            <path
              d="M 164,88 A 28 28 0 0 1 192,116 A 20.2 20.2 0 0 1 164,136.2 A 13.5 13.5 0 0 1 150.5,116 A 7.9 7.9 0 0 1 164,108"
              stroke="#C45827"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.38"
            />
            <path
              d="M 245,64 A 34 34 0 0 1 279,98 A 24.5 24.5 0 0 1 245,122.5 A 16.3 16.3 0 0 1 228.7,98 A 9.5 9.5 0 0 1 245,88.5"
              stroke="#C45827"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.38"
            />
            <path
              d="M 338,42 A 38 38 0 0 1 376,80 A 27.4 27.4 0 0 1 338,107.4 A 18.2 18.2 0 0 1 319.8,80 A 10.6 10.6 0 0 1 338,69.4"
              stroke="#C45827"
              strokeWidth="3.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.38"
            />
          </svg>
        )}

        {type === 4 && (
          // Type 4: Delicate Background Floating Cloud (Small, Top-Left)
          <svg
            viewBox="0 0 220 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M198 56C204 63 200 74 187 76C171 78 162 85 146 85C130 85 121 89 107 89C86 89 76 93 60 93C38 93 23 78 23 60C23 42 39 31 55 35C66 25 86 21 104 25C118 21 134 27 145 38C158 38 171 44 182 48C191 52 193 52 198 56Z"
              fill="white"
              fillOpacity="0.88"
            />
            <path
              d="M 58,34 A 18 18 0 0 1 76,52 A 13 13 0 0 1 58,65 A 8.6 8.6 0 0 1 49.4,52 A 5 5 0 0 1 58,47"
              stroke="#C45827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 112,30 A 16 16 0 0 1 128,46 A 11.5 11.5 0 0 1 112,57.5 A 7.7 7.7 0 0 1 104.3,46 A 4.5 4.5 0 0 1 112,41.5"
              stroke="#C45827"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
          </svg>
        )}

        {type === 5 && (
          // Type 5: Balanced Background Cloud (Small, Bottom-Right)
          <svg
            viewBox="0 0 240 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M216 62C223 70 219 82 205 84C187 87 177 94 159 94C143 94 133 99 117 99C94 99 83 104 65 104C41 104 24 87 24 67C24 47 42 35 60 39C72 28 94 23 114 28C130 23 148 30 160 42C174 44 190 51 202 56C212 60 214 60 216 62Z"
              fill="white"
              fillOpacity="0.88"
            />
            <path
              d="M 64,38 A 20 20 0 0 1 84,58 A 14.4 14.4 0 0 1 64,72.4 A 9.6 9.6 0 0 1 54.4,58 A 5.6 5.6 0 0 1 64,52.4"
              stroke="#C45827"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 124,32 A 18 18 0 0 1 142,50 A 13 13 0 0 1 124,63 A 8.6 8.6 0 0 1 115.4,50 A 5 5 0 0 1 124,45"
              stroke="#C45827"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
          </svg>
        )}
      </div>
    );
  }
);

Cloud.displayName = 'Cloud';
