const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for your React frontend (localhost:1234)
app.use(cors());

// Route to fetch menu by restaurantId
app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const lat = req.query.lat || "12.9352403";
  const lng = req.query.lng || "77.624532";

  const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Referer":
          "https://www.swiggy.com/city/bangalore/mcdonalds-5th-block-koramangala-rest23678",
        "__fetch_req__": "true",
        "platform": "dweb",
        "Cookie":
          "__SW=7lZtXeGeis6Qh_O_JXYuqtmjj3ebML-J; _device_id=3d0a594b-8b07-106a-916b-6eee198a14a8; _gcl_au=1.1.1885829418.1789537070; fontsLoaded=1; application_name=; category=; x-channel=; x-xid=; x-theme=; _swuid=3d0a594b-8b07-106a-916b-6eee198a14a8; _ga_1XHE8JHE6J=GS2.1.s1789548626$o1$g0$t1789548672$j14$l0$h0; userLocation={%22lat%22:12.9352403%2C%22lng%22:77.624532%2C%22address%22:%22Koramangala%2C%20Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _ga_X3K3CELKLV=GS2.1.s1789986062$o4$g1$t1789986474$j29$l0$h0; _ga=GA1.1.1521040854.1789537071; aws-waf-token=7e94c351-d261-4147-a3e8-181bed1b5b99:HgoAlXVp9virFgAA:ndi+obBf6e8V7QoHbddDXsrpvAvXSjtnPqYQ5/j5b4Rs8Xp1FUGoEc/5deh8eu+u0X8YaOGbSqujPYGTv2POKiNykmzMa8DLkU7HAEWGxw9J7BVzQyXS2tZvmz6s7C97qzVy1HcxBeOKGaJIONALqAXnCPBOHSj93eSiiH0+rG+sZz9jJAFFKf04WPNWwYXXKr/4RxFJGgdHaz7kJY0d1iJbQymYxOsurw/WZyb9it7s7bcmTUg5fZite96vnEBp2MFa+Dw1Yto4y7md1pFvFrKaCy+vggidqlBLMSwEWJWoBcWUfla8bjJoq28YxrkJ1JnGPHkiBHj0JdfJeyib; _sid=twcdf5d59c9-8cfc-4c05-845d-e62586126; tid=eyJLSUQiOiIyIiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3OTA2Njk1MTIsImlhdCI6MTc5MDY2NTkxMiwic2Vzc2lvbl9kYXRhIjoiZFdGRjdlV1dIbDI3UTJwSFlNSjczUzZDVVo5U1RadW5pczZleTltRHhJK05XV0VpU0h0a2Y2TEdrWW5LYkpHWWY3cjkySVFmRVVlSVlESVNLWXd2cm55d214b3ZXRlJQcVlYVmdIUFN0TEpLaVdJemF5SVM2dEhFaVlRQWxJM0Q2V0FrUVM2bGVMbnBJVXJTeTRITTVkWGJ3Z2FiTWdFRThQRlRJbUx5d01aTjBCZVhFUjJ4MWlaWXN1VVA4MjhKLzk3RG5PMU1DSFRaYlJ1cWFzZVFmQT09Iiwic2lkIjoidHdjZGY1ZDU5YzktOGNmYy00YzA1LTg0NWQtZTYyNTg2MTI2Iiwic3ViIjoiMjg3ZmM5NzYtY2IxMC00Y2QwLThkNTMtOTc2MmIwMzU3Y2JjIiwidXNlcl9pZCI6IjAifQ.cLbublM4JHhyg_lZ_IFXDPUYc5rR6F918FvLudXcWXc; _guest_tid=eyJLSUQiOiIyIiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3OTA2Njk1MTIsImlhdCI6MTc5MDY2NTkxMiwic2Vzc2lvbl9kYXRhIjoiZFdGRjdlV1dIbDI3UTJwSFlNSjczUzZDVVo5U1RadW5pczZleTltRHhJK05XV0VpU0h0a2Y2TEdrWW5LYkpHWWY3cjkySVFmRVVlSVlESVNLWXd2cm55d214b3ZXRlJQcVlYVmdIUFN0TEpLaVdJemF5SVM2dEhFaVlRQWxJM0Q2V0FrUVM2bGVMbnBJVXJTeTRITTVkWGJ3Z2FiTWdFRThQRlRJbUx5d01aTjBCZVhFUjJ4MWlaWXN1VVA4MjhKLzk3RG5PMU1DSFRaYlJ1cWFzZVFmQT09Iiwic2lkIjoidHdjZGY1ZDU5YzktOGNmYy00YzA1LTg0NWQtZTYyNTg2MTI2Iiwic3ViIjoiMjg3ZmM5NzYtY2IxMC00Y2QwLThkNTMtOTc2MmIwMzU3Y2JjIiwidXNlcl9pZCI6IjAifQ.cLbublM4JHhyg_lZ_IFXDPUYc5rR6F918FvLudXcWXc; _ga_YE38MFJRBZ=GS2.1.s1790665906$o13$g0$t1790665917$j49$l0$h0; _ga_34JYJ0BCRN=GS2.1.s1790665906$o13$g0$t1790665917$j49$l0$h0",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Backend fetch error:", error);
    res.status(500).json({ error: "Failed to fetch menu from Swiggy" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running at http://localhost:${PORT}`);
});