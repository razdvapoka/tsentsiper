import Typograf from "typograf"

const tp = new Typograf({ locale: ["ru", "en-US"] })
tp.setSetting("common/nbsp/afterShortWord", "lengthShortWord", 3)

export default tp
