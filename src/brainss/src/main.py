#!/usr/bin/env python

import rospy
from std_msgs.msg import String
from geometry_msgs.msg import Twist


move = Twist()
mv_list = [(0.0,2.0),(0.0,2.0), (0.0,2.0), (0.0,0.0)]

def getTwist(data):
    move.linear.x = data[0]
    move.angular.z = data[1]


def pubTwist():
    pub = rospy.Publisher('cmd_vel', Twist, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(1) # 10hz
    for data in mv_list:
        getTwist(data)
        rospy.loginfo(move)
        pub.publish(move)
        rate.sleep()


if __name__ == '__main__':
    try:
        pubTwist()
    except rospy.ROSInterruptException:
        pass
