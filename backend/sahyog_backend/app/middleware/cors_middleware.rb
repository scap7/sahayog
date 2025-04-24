class CorsMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    origin = env['HTTP_ORIGIN']
    allowed_origin = 'http://localhost:4001'

    # Block disallowed origins early
    if origin && origin != allowed_origin
      return [
        403,
        { 'Content-Type' => 'text/plain' },
        ['Forbidden: Origin not allowed']
      ]
    end

    if env['REQUEST_METHOD'] == 'OPTIONS' && origin == allowed_origin
      # Reflect requested headers if available (safely)
      request_headers = env['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'] || 'Origin, Content-Type, Accept, Authorization, X-Requested-With'

      return [
        200,
        {
          'Access-Control-Allow-Origin' => allowed_origin,
          'Access-Control-Allow-Credentials' => 'true',
          'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers' => request_headers,
          'Access-Control-Max-Age' => '86400'
        },
        []
      ]
    end

    # Normal request flow
    status, headers, response = @app.call(env)

    if origin == allowed_origin
      headers['Access-Control-Allow-Origin'] = allowed_origin
      headers['Access-Control-Allow-Credentials'] = 'true'
      headers['Access-Control-Expose-Headers'] = 'Authorization'
    end

    [status, headers, response]
  end
end
