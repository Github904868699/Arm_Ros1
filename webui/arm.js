// 连接 rosbridge
const ros = new ROSLIB.Ros({
  url: 'ws://<ROS主机IP>:9090'
});

// 发布目标位姿消息
const targetTopic = new ROSLIB.Topic({
  ros: ros,
  name: '/target_position',
  messageType: 'armcontrol_demo_pkg/hdrarm_msg'
});

// 初始位姿，可根据实际情况调整
let pose = {
  arm_mode: 'arm_control_moveit_ik',
  arm_position_x: 0.2,
  arm_position_y: 0.0,
  arm_position_z: 0.3,
  arm_orientation_x: 0,
  arm_orientation_y: 0,
  arm_orientation_z: 0,
  arm_orientation_w: 1
};

function publishPose() {
  targetTopic.publish(new ROSLIB.Message(pose));
}

function move(axis, delta) {
  pose[`arm_position_${axis}`] += delta;
  publishPose();
}

// 订阅 joint_states 以显示 Gazebo 中的末端位置
const jointSub = new ROSLIB.Topic({
  ros: ros,
  name: '/joint_states',
  messageType: 'sensor_msgs/JointState'
});

jointSub.subscribe(msg => {
  document.getElementById('jointState').textContent =
    JSON.stringify(msg.position.map(v => v.toFixed(3)));
});
