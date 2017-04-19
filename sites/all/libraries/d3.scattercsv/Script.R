setwd("~/Sites/cats/sites/all/libraries/d3.scattercsv")
options(stringsAsFactors = FALSE)
library(data.table)

dat <- fread("MSBB_HIPP_Braak_CERAD.csv")
head(dat)


dat1 <- dat[((dat$PValue < 0.01) | (dat$PValue1 < 0.01)),]

