# WebUI for arm control

Static files in this directory can be served with any HTTP server (e.g. `python3 -m http.server 8080`).

1. Start `rosbridge_server` on the ROS host:
   ```bash
   roslaunch rosbridge_server rosbridge_websocket.launch
   ```
2. Serve these files on port 8080 and open `http://<ROS_IP>:8080/` in a browser.
3. Edit `arm.js` replacing `<ROS主机IP>` with the ROS master IP.
4. Buttons on the page publish `armcontrol_demo_pkg/hdrarm_msg` messages to `/target_position`.
5. The page also subscribes to `/joint_states` and shows the values.
