FROM nginx:1.27-alpine

# replace default server config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy your site (index.html, css/, js/, assets/, etc.)
COPY . /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

EXPOSE 80
