# Three.js Journey

## MinFilter

For big texture on small surface

Note: If you are using `Minfilter + NearestFilter`, you can disabled Mipmaping generation.

## MagFilter

For little texture on big surface

## Texture Filtering

From the left to the right:

- Big texture with nearest filtering for the MinFilter.

- Little texture with the nearest filtering for the MagFilter.

- Little texture with default filtering.

- Big texture with default filtering.

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
