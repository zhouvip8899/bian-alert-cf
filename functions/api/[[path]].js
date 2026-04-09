// Cloudflare Pages Function - API代理
// 匹配 /api/* 所有请求

export async function onRequest(context) {
  const url = new URL(context.request.url);
  // 提取 /api/ 后面的路径
  const apiPath = url.pathname.replace(/^\/api\//, '') || '';
  const query = url.search;
  
  const targetUrl = `https://fapi.binance.com/${apiPath}${query}`;
  
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
