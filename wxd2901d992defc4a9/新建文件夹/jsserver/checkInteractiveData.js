exports.main = function(arg) {
  try {
    arg = JSON.parse(arg);
    var myOpenid = wx.getOpenId();
    var toOpenid = arg.toUser;
    var giftStorageKey = "inviteGift";
    var friendsStorage = wx.getFriendUserStorage([giftStorageKey]);
    var userList = friendsStorage.user_item;
    var ok = false;
    var friendData = userList.find(function(userItem) {
      return userItem.openid === toOpenid;
    });
    if (friendData) {
      var friendKV = friendData.kv_list[friendData.kv_list.length - 1];
      var friendGift = friendKV && friendKV.value;
      if (friendGift) {
        friendGift = JSON.parse(friendGift);
        console.log("[jsserver] friendGift ".concat(JSON.stringify(friendGift)));
      } else {
        friendGift = {
          receiveRecords: [],
          sendCount: 0
        };
      }

      // 奖励重复送给同一个人
      var giftToSameOne = friendGift && friendGift.receiveRecords.some(function(item) {
        return item.fromOpenid === myOpenid;
      });
      // 赠送次数超过限制
      var outLimit = friendGift && friendGift.sendCount >= 10;
      var canNotGift = giftToSameOne || outLimit;
      // const canNotGift = giftToSameOne;
      // 验证
      if (!canNotGift) {
        friendGift.receiveRecords.push({
          fromOpenid: myOpenid,
          time: Date.now()
        });
        friendGift.sendCount = friendGift.sendCount + 1;
        // 写对方的数据
        var ret1 = wx.setFriendUserStorage(toOpenid, [{
          key: giftStorageKey,
          value: JSON.stringify(friendGift)
        }]);
        console.log('写对方数据');
        console.log("\u5F53\u524DsendCount: ".concat(friendGift.sendCount));
        // 写自己的数据
        // let ret2 = wx.setFriendUserStorage(myOpenid, [{
        //     key: giftStorageKey,
        //     value: JSON.stringify(selfGift)
        // }]);
        // if (ret1.errcode == 0 && ret2.errcode == 0) {
        if (ret1.errcode == 0) {
          ok = true;
        } else {
          console.error('fail');
        }
      } else {
        console.log('不能重复送给同一个人 或 已超最大次数');
      }
    }
    if (ok) {
      // 验证通过
      return JSON.stringify({
        "ret": true
      });
    } else {
      // 验证不通过
      return 'validate fail';
    }
  } catch (err) {
    err = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(err);
    console.error(err.message);
  }
};