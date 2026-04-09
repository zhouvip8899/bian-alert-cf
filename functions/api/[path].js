// Cloudflare Pages Function - API代理
// 这个文件在Cloudflare边缘执行，可以直连币安API

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.replace('/api/', '');
  const targetUrl = `https://fapi.binance.com/${path}${url.search}`;
  
  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
