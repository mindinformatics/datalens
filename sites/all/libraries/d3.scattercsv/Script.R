setwd("~/Sites/cats/sites/all/libraries/d3.scattercsv")
options(stringsAsFactors = FALSE)
library(data.table)

dat <- fread("MSBB_HIPP_Braak_CERAD.csv")
head(dat)


dat1 <- dat[((dat$PValue < 0.01) | (dat$PValue1 < 0.01)),]
write.table(dat1, file="MSBB_HIPP_Braak_CERAD_Pval.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
max(dat1$logFC)
min(dat1$logFC)
dat1$color[dat1$logFC > 0 & dat1$logFC1] = "color1"
dat1$color[dat1$logFC < 0] = "color2"
dat1$color[dat1$logFC < -1] = "color3"
write.table(dat1, file="MSBB_HIPP_Braak_CERAD_Pval.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
plot(dat1$logFC, dat1$logFC1)
