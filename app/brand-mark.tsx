type BrandMarkProps = {
  className?: string;
};

/** The six-stripe Plastex mark supplied by the client. */
export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg className={`plastex-speed-mark ${className}`} viewBox="0 0 438 438" fill="none" aria-hidden="true" focusable="false">
      <path className="speed-band speed-band-one" d="M45 225 47 223 359 41 378 30 385 26 386 26 386 75 384 76 373 81 299 114 162 175 45 227Z" fill="currentColor" />
      <path className="speed-band speed-band-two" d="M61 271 62 270 74 263 117 238 222 177 315 123 365 94 384 83 386 82 386 128 385 129 383 130 372 135 262 184 125 245 62 273 61 272Z" fill="currentColor" />
      <path className="speed-band speed-band-three" d="M84 313 89 310 140 280 220 233 312 179 382 138 386 136 386 181 380 184 369 189 322 210 185 271 86 315 84 315Z" fill="currentColor" />
      <path className="speed-band speed-band-four" d="M177 310 180 308 192 301 289 245 298 240 302 238 302 281 300 282 297 283 195 311 184 314 180 315 177 315Z" fill="currentColor" />
      <path className="speed-band speed-band-five" d="M177 361 178 360 256 315 289 296 296 292 302 289 302 332 296 334 289 336 253 346 202 360 191 363 179 366 177 366Z" fill="currentColor" />
      <path className="speed-band speed-band-six" d="M177 412 178 411 209 393 287 348 294 344 302 340 302 383 299 384 285 388 249 398 198 412 187 415 179 417 177 417Z" fill="currentColor" />
    </svg>
  );
}
