import { useService } from "~/composables/request";

export function fetchRoomList() {
  return useService.get(
    "https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3",
    {}
  );
}
