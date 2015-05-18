library("nnet")
args <- commandArgs(trailingOnly = TRUE)
dane <- read.csv(args, header = TRUE)

input  <- dane[,c(1,2,3,4,5,6,7,8,9,10)]

f1 <- as.formula(fitness_calls ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)
f2 <- as.formula(iemas_fitness ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)
f3 <- as.formula(time_elapsed  ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)

siec1 <- nnet(f1, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)
siec2 <- nnet(f2, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)
siec3 <- nnet(f3, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)

hope1 <- predict(siec1, input)
hope2 <- predict(siec2, input)
hope3 <- predict(siec3, input)

blad1 <- abs((hope1 - dane[,11])/dane[,11] * 100)
blad2 <- abs((hope2 - dane[,12])/dane[,12] * 100)
blad3 <- abs((hope3 - dane[,13])/dane[,13] * 100)

output <- cbind(hope1, hope2, hope3, blad1, blad2, blad3)
colnames(output) <- c("net_fitness_calls","net_iemas_fitness","net_time_elapsed", "netdif_fitness_calls","netdif_iemas_fitness","netdif_time_elapsed")

print(result <- cbind(dane, output))

write.csv(result, file = "result.csv", row.names=FALSE, quote=FALSE)