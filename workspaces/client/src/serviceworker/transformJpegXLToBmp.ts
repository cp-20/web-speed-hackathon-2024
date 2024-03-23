// @ts-expect-error - This is a workaround for the missing type definition
import jsquashWasmBinary from '@jsquash/jxl/codec/dec/jxl_dec.wasm';
import { init as jsquashInit } from '@jsquash/jxl/decode';
import 'jimp';

declare const Jimp: typeof import('jimp');

export async function transformJpegXLToBmp(response: Response): Promise<Response> {
  const { decode } = await jsquashInit(undefined, {
    locateFile: () => {},
    wasmBinary: jsquashWasmBinary,
  });

  const imageData = decode(await response.arrayBuffer())!;
  const jpgBinary = await new Jimp(imageData).getBufferAsync(Jimp.MIME_JPEG);

  return new Response(jpgBinary, {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'image/jpg',
    },
  });
}
