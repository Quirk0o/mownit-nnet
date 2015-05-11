library("nnet")
args <- commandArgs(trailingOnly = TRUE)
dane <- read.csv(args, header = TRUE)

traininginput  <- dane[,c(1,2,3,4,5,6,7,8,9,10)]
trainingoutput <- dane[,c(11,12,13)]

f1 <- as.formula(fitness_calls ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)
f2 <- as.formula(iemas_fitness ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)
f3 <- as.formula(time_elapsed  ~ reproduction_minimum + newborn_energy + transferred_energy + amount_of_iterations + immunological_time_span + bite_transfer + mahalanobis + immunological_maturity + good_agent_energy + evaluation_method)

siec1 <- nnet(f1, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)
siec2 <- nnet(f2, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)
siec3 <- nnet(f3, data=dane, size=10, linout=TRUE, skip=TRUE, MaxNWts=10000, trace=FALSE, maxit=100)

input <- read.csv("test.csv", header = TRUE)

hope1 <- predict(siec1, input)
hope2 <- predict(siec2, input)
hope3 <- predict(siec3, input)

print(result <- cbind(hope1, hope2, hope3))

write.csv(result, file = "result.csv")