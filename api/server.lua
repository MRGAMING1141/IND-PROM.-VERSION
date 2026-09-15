-- FAX LUA TOOLS API wrapper for the user's Prometheus fork.
-- Exposes POST /obfuscate and runs the existing Prometheus CLI.
-- Requires a Lua HTTP server runtime such as OpenResty/Lapis; this file
-- intentionally does not execute arbitrary shell commands from request data.

-- Placeholder API adapter: deploy this project with a server runtime and
-- connect its POST /obfuscate route to the existing src.cli pipeline.
-- Request JSON: {"code":"...","preset":"Medium"}
-- Response JSON: {"code":"..."}

return {
  name = "FAX LUA TOOLS API",
  version = "1.0.0",
  route = "POST /obfuscate",
  preset = "Medium"
}
