import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system/createTheme";

interface Props {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    background: "#C7262E",
    color: "white",
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    fontWeight: 600,
    marginTop: 10,
  },
}));

const ModalCondition = (props: Props) => {
  const classes = useStyles();
  const { open, onClose } = props;
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Box py={2} px={1} className={classes.header}>
        <Grid alignItems="center" container spacing={1} wrap="nowrap">
          <Grid item xs={true}>
            Điều khoản và điều kiện liên kết mở tài khoản giao dịch chứng khoán
          </Grid>
          <Grid item xs="auto">
            <IconButton color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Box className={classes.title}>
          CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN LIÊN KẾT MỞ TÀI KHOẢN GIAO DỊCH CHỨNG
          KHOÁN{" "}
        </Box>
        <Box className={classes.subtitle}>Điều 1. Định nghĩa</Box>
        <Box px={2}>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                a.
              </Grid>
              <Grid item xs={true}>
                Điều khoản và Điều kiện: là Điều khoản và Điều kiện liên kết mở
                Tài khoản giao dịch chứng khoán này và các nội dung được sửa
                đổi, bổ sung được HDBank cập nhật trong từng thời kì.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                b.
              </Grid>
              <Grid item xs={true}>
                “Tài khoản giao dịch chứng khoán” (gọi tắt là “TKCK”): là tài
                khoản giao dịch chứng khoán được Khách hàng mở tại Công ty chứng
                khoán để quản lý tiền, chứng khoán, các tài sản liên quan khác
                và thực hiện các giao dịch chứng khoán theo quy định của Công ty
                chứng khoán.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                c.
              </Grid>
              <Grid item xs={true}>
                “Khách hàng” (gọi tắt là “KH”): là cá nhân đăng ký liên kết mở
                Tài khoản giao dịch chứng khoán thông qua việc đồng ý với nội
                dung Điều khoản và Điều kiện này và hoàn thành các bước đăng ký
                liên kết mở tài khoản giao dịch chứng khoán trên Mobile Banking
                hoặc Internet Banking của HDBank.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                d.
              </Grid>
              <Grid item xs={true}>
                “HDBank”: Ngân hàng TMCP Phát triển TP. Hồ Chí Minh, theo đó
                HDBank là ngân hàng tiếp nhận đề nghị từ và hỗ trợ Khách hàng để
                gửi các thông tin của Khách hàng đến Công ty chứng khoán. HDBank
                chỉ đóng vai trò hỗ trợ KH, không phải là bên mở hoặc thực hiện
                các dịch vụ liên quan đến tài khoản giao dịch chứng khoán của
                KH.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                e.
              </Grid>
              <Grid item xs={true}>
                Công ty chứng khoán: là tổ chức có tư cách pháp nhân hoạt động
                kinh doanh chứng khoán theo quy định pháp luật, bao gồm một, một
                số hoặc toàn bộ các hoạt động: môi giới chứng khoán, tự doanh
                chứng khoán, bảo lãnh phát hành chứng khoán, tư vấn đầu tư chứng
                khoán.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                f.
              </Grid>
              <Grid item xs={true}>
                Tài khoản thanh toán: là tài khoản do khách hàng mở tại HDBank
                để sử dụng các dịch vụ thanh toán do HDBank cung ứng.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                g.
              </Grid>
              <Grid item xs={true}>
                eBanking: Kênh ngân hàng điện tử của HDBank, bao gồm Mobile
                Banking, Internet Banking.
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.subtitle}>
          Điều 2. Điều kiện đăng ký liên kết mở Tài khoản giao dịch chứng khoán
        </Box>
        <Box px={2}>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                a.
              </Grid>
              <Grid item xs={true}>
                Tại thời điểm đăng ký, KH phải đáp ứng đồng thời các điều kiện:
                i. Là công dân có quốc tịch Việt Nam, cư trú tại Việt Nam, từ 18
                tuổi trở lên và có năng lực hành vi dân sự đầy đủ theo quy định
                pháp luật Việt Nam; ii. Không thuộc đối tượng FATCA; iii. Không
                thuộc đối tượng bị cấm hạn chế theo quy định Phòng chống rửa
                tiền.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                b.
              </Grid>
              <Grid item xs={true}>
                Có thông tin định danh (bao gồm cả thông tin định danh trực
                tuyến - eKYC) theo đúng quy định của HDBank: được cập nhật trong
                vòng ít nhất 12 tháng, không bị hạn chế từ bộ phận kiểm soát sau
                của HDBank và/hoặc các điều kiện khác theo quy định từng thời kỳ
                của HDBank.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                c.
              </Grid>
              <Grid item xs={true}>
                Ủy quyền cho HDBank để cung cấp các thông tin cá nhân, thông tin
                liên quan đến tài khoản thanh toán của KH cho Bên thứ 3/Công ty
                chứng khoán để đăng ký liên kết mở Tài khoản giao dịch chứng
                khoán.
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.subtitle}>
          Điều 3. Trách nhiệm của Khách hàng
        </Box>
        <Box px={2}>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                a.
              </Grid>
              <Grid item xs={true}>
                Khách hàng đồng ý và hiểu rằng việc mở Tài khoản giao dịch chứng
                khoán được thực hiện bởi Công ty chứng khoán, không liên quan
                đến HDBank. Khách hàng cam kết không có bất kỳ khiếu nại khiếu
                kiện nào với nội dung công việc mà HDBank đã thực hiện để hỗ trợ
                Khách hàng liên kết mở Tài khoản giao dịch chứng khoán.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                b.
              </Grid>
              <Grid item xs={true}>
                Khách hàng cam kết tất các tranh chấp, khiếu nại phát sinh, rủi
                ro (nếu có) liên quan đến việc mở và sử dụng Tài khoản giao dịch
                chứng khoán sẽ do Khách hàng tự xử lý và giải quyết với Công ty
                chứng khoán, không liên quan đến HDBank.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                c.
              </Grid>
              <Grid item xs={true}>
                Khách hàng đồng ý để HDBank thực hiện cung cấp các thông tin
                liên quan đến khách hàng, thông tin liên quan đến Tài khoản
                thanh toán (trong suốt quá trình mở, sử dụng tài khoản thanh
                toán tại HDBank) bao gồm nhưng không giới hạn trạng thái của tài
                khoản tại HDBank (tài khoản đang hoạt động, bị phong tỏa, bị tạm
                khóa,...) cho Công ty chứng khoán nhằm mở, sử dụng Tài khoản
                giao dịch chứng khoán.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                d.
              </Grid>
              <Grid item xs={true}>
                Khách hàng cam kết chịu mọi trách nhiệm về các thông tin mà
                khách hàng đã ủy quyền cho HDBank cung cấp cho Công ty chứng
                khoán để mở Tài khoản và giao dịch chứng khoán từ thời điểm đăng
                ký, xác nhận đồng ý Điều khoản và Điều kiện này
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                e.
              </Grid>
              <Grid item xs={true}>
                Khách hàng chịu trách nhiệm thông báo cho Công ty chứng khoán về
                việc thay đổi thông tin cá nhân, thay đổi liên quan đến Tài
                khoản thanh toán, tình trạng sử dụng của Tài khoản thanh toán,
                như bị phong tỏa, tạm khóa, đóng tài khoản,… trong tất cả các
                trường hợp phát sinh đối với Tài khoản thanh toán.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                f.
              </Grid>
              <Grid item xs={true}>
                Các trách nhiệm theo quy định của HDBank về việc thực hiện hỗ
                trợ liên kết mở tài khoản giao dịch chứng khoán cho Khách hàng
                trong từng thời kỳ.
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.subtitle}>
          Điều 4. Điều khoản miễn trách của HDBank
        </Box>
        <Box px={2}>
          <Box mb={1}>
            HDBank được miễn trừ toàn bộ các trách nhiệm khi đã thực hiện nội
            dung công việc liên quan đến liên kết mở Tài khoản giao dịch chứng
            khoán cho Khách hàng. HDBank không chịu trách nhiệm chi trả, bồi
            hoàn cho Khách hàng và/hoặc Công ty chứng khoán các các tổn
            thất/thiệt hai và các chi phí/nghĩa vụ tài chính phát sinh có liên
            quan trực tiếp hay gián tiếp đối với các tổn thất/thiệt hại (kể cả
            thiệt hại và/hoặc tranh chấp xảy ra với Bên thứ ba nếu có) gây ra
            bởi các nguyên nhân, bao gồm nhưng không giới hạn:
          </Box>
          <Box px={1}>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  a.
                </Grid>
                <Grid item xs={true}>
                  Việc thực hiện các giao dịch chứng khoán/đầu tư chứng khoán
                  của Khách hàng; hoặc
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  b.
                </Grid>
                <Grid item xs={true}>
                  Do lỗi của Khách hàng, Công ty chứng khoán và/hoặc Bên thứ ba
                  bất kỳ; hoặc
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  c.
                </Grid>
                <Grid item xs={true}>
                  Tranh chấp giữa KH và Công ty chứng khoán và/hoặc Bên thứ ba
                  bất kỳ; hoặc
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  d.
                </Grid>
                <Grid item xs={true}>
                  Các giao dịch chuyển khoản từ Tài khoản thanh toán sang Tài
                  khoản giao dịch chứng khoán dù thành công hay không thành công
                  theo yêu cầu của Khách hàng; hoặc
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  e.
                </Grid>
                <Grid item xs={true}>
                  Việc thực hiện giao dịch ghi nợ nhầm Tài khoản giao dịch chứng
                  khoán/Tài khoản thanh toán do lỗi của Khách hàng khi thao tác,
                  thực hiện giao dịch; hoặc
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  f.
                </Grid>
                <Grid item xs={true}>
                  Sự ngắt quãng, trì hoãn, chậm trễ, tình trạng không sẵn sàng
                  sử dụng hoặc bất kỳ sự cố nào xảy ra trong quá trình cung cấp
                  dịch vụ do các nguyên nhân ngoài khả năng kiểm soát hợp lý của
                  HDBank, bao gồm nhưng không giới hạn ở tình trạng gián đoạn do
                  dịch vụ cần được nâng cấp, sửa chữa, lỗi đường truyền của nhà
                  cung cấp dịch vụ viễn thông; hoặc{" "}
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  g.
                </Grid>
                <Grid item xs={true}>
                  Bất cứ sự kiện bất khả kháng nào bao gồm nhưng không giới hạn
                  bởi thiên tai, đình công, khủng bố, bạo loạn, chiến tranh,
                  hoặc các yêu cầu hay chỉ thị của Chính phủ và các cơ quan nhà
                  nước có thẩm quyền, thay đổi chính sách, quy định của pháp
                  luật.
                </Grid>
              </Grid>
            </Box>
            <Box mb={1}>
              <Grid container spacing={1}>
                <Grid item xs="auto">
                  h.
                </Grid>
                <Grid item xs={true}>
                  Các trường hợp khác.
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className={classes.subtitle}>
          Điều 5. Thời hạn hiệu lực và điều khoản thi hành
        </Box>
        <Box px={2}>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                a.
              </Grid>
              <Grid item xs={true}>
                Các Điều khoản và Điều kiện này có hiệu lực kể từ ngày Khách
                hàng thực hiện xác nhận đồng ý trên giao diện eBanking của
                HDBank.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                b.
              </Grid>
              <Grid item xs={true}>
                Bằng việc xác nhận đăng ký, Khách hàng cam kết đã đọc, hiểu rõ
                và tuân thủ đúng, đầy đủ Điều khoản và Điều kiện này và các quy
                định liên quan của Pháp luật Việt Nam. KH cam kết chịu mọi trách
                nhiệm liên quan đến việc thực hiện, tuân thủ quy định tại Điều
                khoản và Điều kiện này.
              </Grid>
            </Grid>
          </Box>
          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs="auto">
                c.
              </Grid>
              <Grid item xs={true}>
                Quy định tại Điều khoản và Điều kiện này không hạn chế hoặc loại
                trừ các quy định tại Điều khoản và Điều kiện đăng ký, sử dụng
                dịch vụ ngân hàng điện tử mà Khách hàng đã đăng ký tại HDBank.
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModalCondition;
